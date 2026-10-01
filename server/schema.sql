PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS Account (
  AccountId INTEGER PRIMARY KEY AUTOINCREMENT,
  Name TEXT NOT NULL,
  Balance REAL NOT NULL,
  AccountType TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS Category (
  CategoryId INTEGER PRIMARY KEY AUTOINCREMENT,
  CategoryName TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS "Transaction" (
  TransactionId INTEGER PRIMARY KEY AUTOINCREMENT,
  Description TEXT NOT NULL,
  Amount REAL NOT NULL,
  AccountAccountId INTEGER NOT NULL,
  CategoryCategoryId INTEGER NOT NULL,

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId),

  FOREIGN KEY (CategoryCategoryId)
    REFERENCES Category(CategoryId)
);

CREATE TABLE IF NOT EXISTS Budget (
  BudgetId INTEGER PRIMARY KEY AUTOINCREMENT,
  AmountSet REAL NOT NULL,
  Period TEXT NOT NULL,
  CategoryCategoryId INTEGER NOT NULL,
  AccountAccountId INTEGER NOT NULL,

  FOREIGN KEY (CategoryCategoryId)
    REFERENCES Category(CategoryId),

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId)
);

CREATE TABLE IF NOT EXISTS "Saving Goal" (
  SavingGoalId INTEGER PRIMARY KEY AUTOINCREMENT,
  GoalName TEXT NOT NULL,
  GoalAmount REAL NOT NULL,
  CurrentAmount REAL NOT NULL,
  GoalDate TEXT NOT NULL,
  AccountAccountId INTEGER NOT NULL,

  FOREIGN KEY (AccountAccountId)
    REFERENCES Account(AccountId)
);

INSERT INTO Account (Name, Balance, AccountType)
SELECT 'FNB Cash', 1298, 'cash'
WHERE NOT EXISTS (
  SELECT 1
  FROM Account
  WHERE AccountType = 'cash'
);

INSERT INTO Account (Name, Balance, AccountType)
SELECT 'FNB Credit', -450, 'credit'
WHERE NOT EXISTS (
  SELECT 1
  FROM Account
  WHERE AccountType = 'credit'
);

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
  Period,
  CategoryCategoryId,
  AccountAccountId
)
SELECT
  850,
  'monthly',
  Category.CategoryId,
  Account.AccountId
FROM Category
CROSS JOIN Account
WHERE Category.CategoryName = 'Food'
  AND Account.AccountType = 'cash'
  AND NOT EXISTS (
    SELECT 1
    FROM Budget
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
WHERE AccountType = 'cash'
  AND NOT EXISTS (
    SELECT 1
    FROM "Saving Goal"
  );;