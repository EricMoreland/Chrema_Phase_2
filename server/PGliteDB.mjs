import { PGlite } from '@electric-sql/pglite'

const db = new PGlite()

await db.exec(`
  CREATE TABLE IF NOT EXISTS Account (
    AccountId INTEGER PRIMARY KEY,
    Name TEXT NOT NULL UNIQUE,
    CashBalance REAL NOT NULL,
    CreditBalance REAL NOT NULL,
    AccountType TEXT NOT NULL
  );
  INSERT INTO Account (AccountId, Name, CashBalance, CreditBalance, AccountType) 
  VALUES ('1', 'FNB Account', 1298, 0, 'bank');
  INSERT INTO Account (AccountId, Name, CashBalance, CreditBalance, AccountType) 
  VALUES ('2', 'Capitec Account', 500, 0, 'bank');

  CREATE TABLE IF NOT EXISTS "Transaction" (
    TransactionId INTEGER PRIMARY KEY,
    Description TEXT NOT NULL,
    Amount REAL NOT NULL,
    AccountAccountId INTEGER NOT NULL,
    CategoryCategoryId INTEGER NOT NULL,
    AccountType TEXT NOT NULL CHECK (AccountType IN ('cash', 'credit')),
    TransactionKind TEXT NOT NULL CHECK (TransactionKind IN ('income', 'expense')),
    CreatedAt TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (AccountAccountId) REFERENCES Account (AccountId),
    FOREIGN KEY (CategoryCategoryId) REFERENCES Category (CategoryId)
  );
  INSERT INTO Transaction (
    TransactionId,
    Description,
    Amount,
    AccountAccountId,
    CategoryCategoryId,
    AccountType,
    TransactionKind
  ) VALUES ('1','Groceries',100,1,1,'cash','expense');

  CREATE TABLE IF NOT EXISTS Category (
  CategoryId INTEGER PRIMARY KEY,
  CategoryName TEXT NOT NULL UNIQUE
);
INSERT INTO Category (CategoryId, CategoryName)
VALUES
  (1, 'Home'),
  (2, 'Groceries'),
  (3, 'Car'),
  (4, 'Food'),
  (5, 'Other')
`)

export default db