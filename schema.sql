CREATE TABLE IF NOT EXISTS eos_everipediaiq_accounts(
    user VARCHAR(13) NOT NULL,
    balance DECIMAL(20,3) NOT NULL,
    symbol VARCHAR(5) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE IF NOT EXISTS eos_everipediaiq_stat(
    symbol VARCHAR(5) NOT NULL,
    supply DECIMAL(20,3) NOT NULL,
    max_supply DECIMAL(20,3) NOT NULL,
    issuer VARCHAR(13) NOT NULL,
    PRIMARY KEY (symbol)
);

CREATE TABLE IF NOT EXISTS eos_eparticlectr_stakes(
    id INT AUTO_INCREMENT,
    user VARCHAR(13) NOT NULL,
    amount INT NOT NULL,
    timestamp INT NOT NULL,
    completion_time DATETIME NOT NULL,
    claimed BOOL NOT NULL DEFAULT FALSE,
    PRIMARY KEY (id)
);
ALTER TABLE eos_eparticlectr_stakes AUTO_INCREMENT=0;

CREATE TABLE IF NOT EXISTS eos_eparticlectr_brainpower(
    user VARCHAR(13) NOT NULL,
    balance DECIMAL(20,3) NOT NULL,
    PRIMARY KEY (user)
);

CREATE TABLE IF NOT EXISTS eos_eparticlectr_proposals(
    id INT AUTO_INCREMENT,
    proposed_article_hash VARCHAR(50) NOT NULL,
    old_article_hash VARCHAR(50) NOT NULL,
    proposer VARCHAR(13) NOT NULL,
    tier TINYINT(1),
    starttime DATETIME NOT NULL,
    endtime DATETIME NOT NULL,
    finalized_time DATETIME,
    status TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);
ALTER TABLE eos_eparticlectr_proposals AUTO_INCREMENT=0;

CREATE TABLE IF NOT EXISTS eos_eparticlectr_votes(
    id INT AUTO_INCREMENT,
    proposed_article_hash VARCHAR(50) NOT NULL,
    approve BOOLEAN NOT NULL,
    is_editor BOOLEAN NOT NULL,
    amount INT NOT NULL,
    voter VARCHAR(13) NOT NULL,
    timestamp DATETIME,
    PRIMARY KEY (id)
);
ALTER TABLE eos_eparticlectr_votes AUTO_INCREMENT=0;
