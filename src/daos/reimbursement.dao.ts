import { PoolClient } from "pg";
import { connectionPool } from "./index.dao";


export async function findAllRequestByStatusId(status: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM project0.reimbursement as re
        INNER JOIN project0.reimbursementstatus as sta ON (re.status = sta.statusid)
        WHERE re.status = $1 ORDER BY re.datesubmitted ASC;`;
        const result = await client.query(queryString, [status]);
        const restat = result.rows[0];
        return restat;
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}

export async function findAllRequestByUserId(userId: number) {
    let client: PoolClient;
    try {
        client = await connectionPool.connect();
        const queryString = `SELECT * FROM project0.reimbursement as re
        INNER JOIN project0.employee as emp ON (re.author = emp.userid)
        WHERE re.author = $1 ORDER BY re.datesubmitted ASC;`;
        const result = await client.query(queryString, [userId]);
        const reuser = result.rows[0];
        return reuser;
    } catch (err) {
        console.log(err);
        return undefined;
    } finally {
        client && client.release();
    }
}