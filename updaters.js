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
    //const amount = Number(payload.data.quantity.split(' ')[0]);
    //const symbol = payload.data.quantity.split(' ')[1];
    //context.conn.query(`
    //    UPDATE eos_everipedia_accounts SET balance = balance - ${amount} WHERE user=${payload.data.from};
    //    INSERT INTO eos_everipediaiq_accounts VALUES("${payload.data.to}", ${amount})
    //        ON DUPLICATE KEY UPDATE balance = balance + ${amount};
    //`);
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
    }
]
