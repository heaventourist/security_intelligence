import sqlite3
import json


def batch_insert_from_json(file_name):
    conn = sqlite3.connect('../instance/flaskr.sqlite')
    c = conn.cursor()

    with open(file_name, 'r') as f:
        json_dict = json.load(f)

    for cve_item in json_dict['CVE_Items']:
        vuln_id = cve_item.get('cve', {}).get('CVE_data_meta', {}).get('ID','')
        summary = []
        for s in cve_item.get('cve', {}).get('description', {}).get("description_data", []):
            summary.append(s['value'])
        summary = ','.join(summary)
        cvss_severity = cve_item.get('impact', {}).get("baseMetricV2", {}).get("severity", "")
        product_name = []
        vendor_name = []
        for v in cve_item.get('cve',{}).get('affects',{}).get('vendor',{}).get("vendor_data", []):
            vendor_name.append(v["vendor_name"])
            for p in v.get('product',{}).get('product_data',[]):
                product_name.append(p.get('product_name', ''))
        product_name = ','.join(product_name)
        vendor_name = ','.join(vendor_name)
        extra = json.dumps(cve_item)
        arguments = []
        for n in [vuln_id, summary, cvss_severity, product_name, vendor_name, extra]:
            arguments.append(n.replace('\'', '\"'))

        sql = "INSERT INTO %s (vuln_id, summary, cvss_severity, product_name, vendor_name, extra) \
            VALUES ('%s', '%s', '%s', '%s', '%s', '%s')" % ('nvd', arguments[0], arguments[1], arguments[2], 
                arguments[3], arguments[4], arguments[5])
        c.execute(sql)
    conn.commit()
    conn.close()

if __name__ == '__main__':
    batch_insert_from_json('../nvdcve-1.0-modified.json')
