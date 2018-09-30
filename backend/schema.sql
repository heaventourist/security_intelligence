CREATE TABLE nvd (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  vuln_id TEXT NOT NULL,
  summary TEXT NOT NULL,
  cvss_severity TEXT NOT NULL,
  product_name TEXT NOT NULL,
  vendor_name TEXT NOT NULL,
  extra TEXT NOT NULL
);
