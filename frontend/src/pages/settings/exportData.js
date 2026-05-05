export const databaseSchema = {
  version: "1.0.0",
  tables: [
    { name: "deposits", columns: ["id", "account_id", "balance", "type", "branch_id", "created_at"] },
    { name: "loans", columns: ["id", "customer_id", "amount", "product_type", "status", "disbursement_date"] },
    { name: "customers", columns: ["id", "name", "segment", "region", "products_held", "created_at"] },
    { name: "branches", columns: ["id", "name", "region", "manager_id", "target", "actual"] },
    { name: "transactions", columns: ["id", "account_id", "channel", "amount", "type", "timestamp"] },
    { name: "collections", columns: ["id", "loan_id", "dpd_bucket", "amount_due", "collector_id", "status"] }
  ],
  relationships: [
    { from: "deposits.account_id", to: "customers.id" },
    { from: "loans.customer_id", to: "customers.id" },
    { from: "branches.manager_id", to: "users.id" },
    { from: "transactions.account_id", to: "deposits.account_id" },
    { from: "collections.loan_id", to: "loans.id" }
  ]
};

export const dataSourcesCatalog = {
  version: "1.0.0",
  sources: [
    { id: 1, name: "Core Banking System", type: "Oracle", status: "Connected", tables: 24, lastSync: "2024-01-21 09:45" },
    { id: 2, name: "Loan Management System", type: "PostgreSQL", status: "Connected", tables: 18, lastSync: "2024-01-21 09:42" },
    { id: 3, name: "CRM Database", type: "Salesforce", status: "Connected", tables: 12, lastSync: "2024-01-21 09:30" },
    { id: 4, name: "Mobile Banking API", type: "REST API", status: "Connected", tables: 8, lastSync: "2024-01-21 09:45" },
    { id: 5, name: "Internet Banking", type: "MySQL", status: "Connected", tables: 15, lastSync: "2024-01-21 09:40" },
    { id: 6, name: "ATM Network", type: "SQL Server", status: "Connected", tables: 6, lastSync: "2024-01-21 09:35" },
    { id: 7, name: "Card Management", type: "Oracle", status: "Connected", tables: 10, lastSync: "2024-01-21 09:38" },
    { id: 8, name: "Branch Operations", type: "PostgreSQL", status: "Connected", tables: 14, lastSync: "2024-01-21 09:44" },
    { id: 9, name: "Collections System", type: "MySQL", status: "Connected", tables: 8, lastSync: "2024-01-21 09:41" },
    { id: 10, name: "Risk Analytics", type: "Snowflake", status: "Connected", tables: 20, lastSync: "2024-01-21 09:43" },
    { id: 11, name: "Customer Service", type: "Zendesk API", status: "Connected", tables: 5, lastSync: "2024-01-21 09:30" },
    { id: 12, name: "Regulatory Reporting", type: "Data Warehouse", status: "Connected", tables: 30, lastSync: "2024-01-21 09:00" }
  ],
  totalTables: 170,
  refreshInterval: "15 minutes"
};

export function downloadJsonFile(payload, filename) {
  const enriched = { ...payload, generated: new Date().toISOString() };
  const blob = new Blob([JSON.stringify(enriched, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
