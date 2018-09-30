from backend.db import get_db, close_db
import json
import traceback


class nvd_store:
    def __init__(self):
        self.db_name = 'nvd'
        self.c = get_db()

    def insert(self, vuln_id='', summary='', cvss_severity='', product_name='', vendor_name='', extra=''):
        sql = "INSERT INTO %s (vuln_id, summary, cvss_severity, product_name, vendor_name, extra) \
            VALUES (\'%s\', \'%s\', \'%s\', \'%s\', \'%s\', \'%s\')" % (self.db_name, vuln_id, 
                summary, cvss_severity, product_name, vendor_name, extra)
        print(sql)
        self.c.execute(sql)
        close_db()

    def search_by_vuln_id(self, vuln_id):
        try:
            sql = 'SELECT vuln_id, summary, cvss_severity, product_name, vendor_name FROM %s WHERE vuln_id=\'%s\'' % (self.db_name, vuln_id)
            cursor = self.c.execute(sql)
            ret = json.dumps({'code': 0, 'content': cursor.fetchall()})
        except:
            ret = json.dumps({'code': 1, 'content': []})
        close_db()
        return ret

    def all(self):
        try:
            sql = 'SELECT vuln_id, summary, cvss_severity, product_name, vendor_name FROM %s' % (self.db_name)
            cursor = self.c.execute(sql)
            ret = json.dumps({'code': 0, 'content': cursor.fetchall()})
        except:
            ret = json.dumps({'code': 1, 'content': []})
            traceback.print_exc()
        close_db()
        return ret

    def search_by_product_name(self, product_name):
        try:
            sql = 'SELECT vuln_id, summary, cvss_severity, product_name, vendor_name FROM %s WHERE product_name LIKE \'%%%s%%\'' % (self.db_name, product_name)
            cursor = self.c.execute(sql)
            ret = json.dumps({'code': 0, 'content': cursor.fetchall()})
        except:
            ret = json.dumps({'code': 1, 'content': []})
        close_db()
        return ret

    def search_by_vendor_name(self, vendor_name):
        try:
            sql = 'SELECT vuln_id, summary, cvss_severity, product_name, vendor_name FROM %s WHERE vendor_name LIKE \'%%%s%%\'' % (self.db_name, vendor_name)
            cursor = self.c.execute(sql)
            ret = json.dumps({'code': 0, 'content': cursor.fetchall()})
        except:
            ret = json.dumps({'code': 1, 'content': []})
        close_db()
        return ret


def get_nvd_store():
    store = nvd_store()
    return store


