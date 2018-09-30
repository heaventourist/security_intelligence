from backend.nvd_store import get_nvd_store
import json

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from backend.db import get_db

bp = Blueprint('home', __name__, url_prefix='/')


@bp.route('/', defaults={'path': ''})
@bp.route('/<path:path>')
def catch_all(path):
    return render_template('index.html')


@bp.route('/fetch_all', methods=['GET'])
def fetchAll():
    store = get_nvd_store()
    tmp = json.loads(store.all())
    code = tmp['code']
    contents = tmp['content']
    if code == 0:
        ret = []
        for content in contents:
            vuln_id, summary, cvss_severity, product_name, vendor_name = content
            ret.append({'vuln_id': vuln_id, 'summary': summary,
                'cvss_severity': cvss_severity, 'product_name': product_name, 'vendor_name': vendor_name})
        ret = json.dumps({'code': code, 'content': ret})
    else:
        ret = json.dumps({'code': code, 'content': []})
    return ret



@bp.route('/search_by_vuln_id', methods=['GET', 'POST'])
def searchByVulnId():
    vuln_id = request.args.get('vuln_id')
    print(vuln_id)
    store = get_nvd_store()
    tmp = json.loads(store.search_by_vuln_id(vuln_id))
    code = tmp['code']
    contents = tmp['content']
    if code == 0:
        ret = []
        for content in contents:
            vuln_id, summary, cvss_severity, product_name, vendor_name = content
            ret.append({'vuln_id': vuln_id, 'summary': summary,
                'cvss_severity': cvss_severity, 'product_name': product_name, 'vendor_name': vendor_name})
        ret = json.dumps({'code': code, 'content': ret})
    else:
        ret = json.dumps({'code': code, 'content': []})
    return ret


@bp.route('/search_by_product_name', methods=['GET', 'POST'])
def searchByProductName():
    product_name = request.args.get('product_name')
    store = get_nvd_store()
    tmp = json.loads(store.search_by_product_name(product_name))
    code = tmp['code']
    contents = tmp['content']
    if code == 0:
        ret = []
        for content in contents:
            vuln_id, summary, cvss_severity, product_name, vendor_name = content
            ret.append({'vuln_id': vuln_id, 'summary': summary,
                'cvss_severity': cvss_severity, 'product_name': product_name, 'vendor_name': vendor_name})
        ret = json.dumps({'code': code, 'content': ret})
    else:
        ret = json.dumps({'code': code, 'content': []})
    return ret


@bp.route('/search_by_vendor_name', methods=['GET', 'POST'])
def searchByVendorName():
    vendor_name = request.args.get('vendor_name')
    store = get_nvd_store()
    tmp = json.loads(store.search_by_vendor_name(vendor_name))
    code = tmp['code']
    contents = tmp['content']
    if code == 0:
        ret = []
        for content in contents:
            vuln_id, summary, cvss_severity, product_name, vendor_name = content
            ret.append({'vuln_id': vuln_id, 'summary': summary,
                'cvss_severity': cvss_severity, 'product_name': product_name, 'vendor_name': vendor_name})
        ret = json.dumps({'code': code, 'content': ret})
    else:
        ret = json.dumps({'code': code, 'content': []})
    return ret
