const oracledb = require('oracledb');

async function run() {
    let connection;

    try{
        connection = await oracledb.getConnection({
            user        :"scott",
            password    :"tiger",
            connectionString :"localhost/orcl"  //ORCLconnHR
        });

        const result = await connection.execute(
            `SELECT * FROM ACTORS`
        )
        console.log(result);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error(error)
            }
        }
    }
}

run();