async function create(state, payload, blockInfo, context) {
    const max_supply = Number(payload.data.maximum_supply.split(' ')[0]);
    const symbol = payload.data.maximum_supply.split(' ')[1];
    await context.conn.query(`
        INSERT INTO eos_everipediaiq_stat VALUES("${symbol}", 0, ${max_supply}, "${payload.data.issuer}");
    `);
}

async function issue(state, payload, blockInfo, context) {
    const amount = Number(payload.data.quantity.split(' ')[0]);
    const symbol = payload.data.quantity.split(' ')[1];
    await context.conn.query(`
        UPDATE eos_everipediaiq_stat SET supply=${amount} WHERE symbol="${symbol}";
        INSERT INTO eos_everipediaiq_accounts VALUES("${payload.data.to}", ${amount}, "${symbol}")
            ON DUPLICATE KEY UPDATE balance = balance + ${amount};
    `);
}

async function transfer(state, payload, blockInfo, context) {
    const amount = Number(payload.data.quantity.split(' ')[0]);
    const symbol = payload.data.quantity.split(' ')[1];
    context.conn.query(`
        UPDATE eos_everipedia_accounts SET balance = balance - ${amount} WHERE user="${payload.data.from}";
        INSERT INTO eos_everipediaiq_accounts VALUES("${payload.data.to}", ${amount})
            ON DUPLICATE KEY UPDATE balance = balance + ${amount};
    `);
}

async function stake(state, payload, blockInfo, context) {
    const amount = Number(payload.data.quantity.split(' ')[0]);
    const symbol = payload.data.quantity.split(' ')[1];
    const timestamp = blockInfo.timestamp.toISOString().slice(0, 19).replace('T', ' ');
    const completion_date = new Date(blockInfo.timestamp.getTime() + 21*86400*1000);
    const completion = completion_date.toISOString().slice(0, 19).replace('T', ' ');

    const completion = timestamp + 21*86400;
    context.conn.query(`
        UPDATE eos_everipedia_accounts SET balance = balance - ${amount} WHERE user="${payload.data.from}";
        UPDATE eos_everipedia_accounts SET balance = balance + ${amount} WHERE user="eparticlectr";
	INSERT INTO eos_eparticlectr_stakes (user, amount, timestamp, completion_time) 
	    VALUES ("${payload.data.from}", ${amount}, ${timestamp}, ${completion});
	INSERT INTO eos_eparticlectr_brainpower VALUES ("${payload.data.from}", ${amount})
	    ON DUPLICATE KEY UPDATE balance = balance + ${amount};
    `);
}

async function propose(state, payload, blockInfo, context) {
    const starttime = blockInfo.timestamp.toISOString().slice(0, 19).replace('T', ' ');
    const endtime_date = new Date(blockInfo.timestamp.getTime() + 6*3600*1000);
    const endtime = endtime_date.toISOString().slice(0, 19).replace('T', ' ');
    context.conn.query(`
	INSERT INTO eos_eparticlectr_proposals (proposed_article_hash, old_article_hash, proposer, starttime, endtime)
	    VALUES ("${payload.data.proposed_article_hash}", "${payload.data.old_article_hash}", "${payload.data.proposer}", "${starttime}", "${endtime}");
	UPDATE eos_eparticlectr_brainpower SET balance = balance - 10 WHERE user = "${payload.data.proposer}";
	INSERT INTO eos_eparticlectr_votes (proposed_article_hash, approve, is_editor, amount, voter, timestamp)
	    VALUES ("${payload.data.proposed_article_hash}", true, true, 10, "${payload.data.from}", "${starttime}")
    `);
}

async function vote(state, payload, blockInfo, context) {
}

async function finalize(state, payload, blockInfo, context) {
}

async function finalizeById(state, payload, blockInfo, context) {
}

async function claimRewards(state, payload, blockInfo, context) {
}

async function calcRewards(state, payload, blockInfo, context) {
}

async function updateWiki(state, payload, blockInfo, context) {
}

module.exports = [
    {
	actionType: "everipediaiq::create",
	updater: create
    },
    {
	actionType: "everipediaiq::issue",
	updater: issue
    },
    {
	actionType: "everipediaiq::transfer",
	updater: transfer
    },
    {
	actionType: "everipediaiq::brainmeiq",
	updater: stake
    },
    {
	actionType: "eparticlectr::propose",
	updater: propose
    },
    {
	actionType: "eparticlectr::fnlbyhash",
	updater: finalize
    },
    {
	actionType: "eparticlectr::finalize",
	updater: finalizeById
    },
    {
	actionType: "eparticlectr::brainclmid",
	updater: claimRewards
    },
    {
	actionType: "eparticlectr::procrewards",
	updater: calcRewards
    },
    {
	actionType: "eparticlectr::updatewiki",
	updater: updateWiki
    }
]
