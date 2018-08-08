CREATE TABLE IF NOT EXISTS eos_everipediaiq_accounts(
    user VARCHAR(13),
    balance DECIMAL(20,3),
    symbol VARCHAR(5),
    PRIMARY KEY (user)
);

CREATE TABLE IF NOT EXISTS eos_everipediaiq_stat(
    symbol VARCHAR(5),
    supply DECIMAL(20,3),
    max_supply DECIMAL(20,3),
    issuer VARCHAR(13),
    PRIMARY KEY (symbol)
);
