PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Category (
  CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
  CategoryName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Saving Goal" (
  SavingId INTEGER PRIMARY KEY AUTOINCREMENT,
  GoalName TEXT NOT NULL,
  GoalAmount REAL NOT NULL,
  CurrentAmount REAL NOT NULL,
  GoalDate TEXT NOT NULL,
  AccountAccountId INTEGER NOT NULL,

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId)
);

CREATE TABLE IF NOT EXISTS Account ( --prevent creation of duplicate tables when running the schema.sql file multiple times(i.e start & stop the server multiple times)
  AccountId INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL UNIQUE, --no dublicate accounts (i.e only 1 FNB account)
  CashBalance REAL NOT NULL,
  CreditBalance REAL NOT NULL,
  AccountType TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Budget (
  BudgetId INTEGER PRIMARY KEY AUTOINCREMENT,
  AmountSet REAL NOT NULL,
  CurrentAmount REAL NOT NULL,
  Period TEXT NOT NULL, --NB remeber to use dropdown menu to select period when creating a budget (limit to daily, weekly, monthly, yearly)
  CategoryCategoryId INTEGER NOT NULL,
  AccountAccountId INTEGER NOT NULL,

  FOREIGN KEY (CategoryCategoryId)
    REFERENCES Category(CategoryId),

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId)
);

CREATE TABLE IF NOT EXISTS "Transaction" ( --use "" because SQL uses Transaction as a reserved keyword
  TransactionId INTEGER PRIMARY KEY AUTOINCREMENT,
  Description TEXT NOT NULL,
  Amount REAL NOT NULL,
  AccountAccountId INTEGER NOT NULL, --Links transaction to the account it belongs to
  CategoryCategoryId INTEGER NOT NULL, --Links transaction to the category it belong to

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId), -- AccountAccountId in transaction table must match an exisintg AcountId in the Account table

  FOREIGN KEY (CategoryCategoryId)
    REFERENCES Category(CategoryId)
);


-- test data for side panels


  -- insert if does not exist (IGNORE if already exists)
INSERT OR IGNORE INTO Account (Name, CashBalance, CreditBalance, AccountType) -- table and columns to insert into
VALUES ('FNB Account', 1298, 0, 'bank');

INSERT OR IGNORE INTO Account (Name, CashBalance, CreditBalance, AccountType) 
VALUES ('Capitec Account', 500, 0, 'bank');

INSERT INTO Category (CategoryName)
SELECT 'Home'
WHERE NOT EXISTS (
  SELECT 1
  FROM Category
  WHERE CategoryName = 'Home'
);

INSERT INTO Category (CategoryName)
SELECT 'Groceries'
WHERE NOT EXISTS (
  SELECT 1
  FROM Category
  WHERE CategoryName = 'Groceries'
);

INSERT INTO Category (CategoryName)
SELECT 'Car'
WHERE NOT EXISTS (
  SELECT 1
  FROM Category
  WHERE CategoryName = 'Car'
);

INSERT INTO Category (CategoryName)
SELECT 'Food'
WHERE NOT EXISTS (
  SELECT 1
  FROM Category
  WHERE CategoryName = 'Food'
);

INSERT INTO Category (CategoryName)
SELECT 'Other'
WHERE NOT EXISTS (
  SELECT 1
  FROM Category
  WHERE CategoryName = 'Other'
);

INSERT INTO Budget (
  AmountSet,
  CurrentAmount,
  Period,
  CategoryCategoryId,
  AccountAccountId
)
SELECT
  850,
  200,
  'monthly',
  Category.CategoryId,
  Account.AccountId
FROM Category
CROSS JOIN Account
WHERE Category.CategoryName = 'Food'
  AND Account.Name = 'FNB Account'
  AND NOT EXISTS (
    SELECT 1
    FROM Budget
    WHERE CategoryCategoryId = Category.CategoryId
      AND AccountAccountId = Account.AccountId
  );

  INSERT INTO "Saving Goal" (
  GoalName,
  GoalAmount,
  CurrentAmount,
  GoalDate,
  AccountAccountId
)
SELECT
  'Emergency fund',
  700,
  350,
  '2026-12-31',
  AccountId
FROM Account
WHERE Name = 'FNB Account'
  AND NOT EXISTS (
    SELECT 1
    FROM "Saving Goal"
    WHERE AccountAccountId = Account.AccountId
  );;