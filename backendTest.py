import os
import unittest
import tempfile
import json
import re
import backend


with open(os.path.join(os.path.dirname(__file__), 'data.sql'), 'rb') as f:
    _data_sql = f.read().decode('utf8')

class BackendTestCase(unittest.TestCase):
    def setUp(self):
        self.db_fd, self.db_path = tempfile.mkstemp()
        backend.app.config['DATABASE'] = self.db_path
        backend.app.testing = True
        self.app = backend.app.test_client()
        with backend.app.app_context():
            backend.db.init_db()
            backend.db.get_db().executescript(_data_sql)

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(backend.app.config['DATABASE'])

    def test_homePage(self):
        rv = self.app.get('/').data.decode()
        title = re.findall(r'<title>(.+)</title>', rv)[0]
        assert title == 'security_intelligence', 'homepage title not correct'

    def test_fetchAll(self):
        rv = self.app.get('/fetch_all')
        rv = json.loads(rv.data.decode())
        assert rv['code'] == 0 and len(rv['content']) != 0, 'non-empty database is empty'

    def test_searchByVulnId(self):
        rv = self.app.get('/search_by_vuln_id', query_string=dict(vuln_id='test_id_1'))
        rv = json.loads(rv.data.decode())
        assert rv['code'] == 0 and rv['content'][0]['vuln_id'] == 'test_id_1', 'wrong item acquired'

    def test_searchByProductName(self):
        rv = self.app.get('/search_by_product_name', query_string=dict(product_name='test_product_2'))
        rv = json.loads(rv.data.decode())
        assert rv['code'] == 0 and rv['content'][0]['product_name'] == 'test_product_2', 'wrong item acquired'

    def test_searchByVendorName(self):
        rv = self.app.get('/search_by_vendor_name', query_string=dict(vendor_name='test_vendor_3'))
        rv = json.loads(rv.data.decode())
        assert rv['code'] == 0 and rv['content'][0]['vendor_name'] == 'test_vendor_3', 'wrong item acquired'

if __name__ == '__main__':
    unittest.main()