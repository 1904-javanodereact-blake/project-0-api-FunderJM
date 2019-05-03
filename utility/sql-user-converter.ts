import { User } from '../src/model/user';
import { SqlUser } from '../src/dto/sql-user.dto';



export function convertSqlUser(user: SqlUser) {
    return new User(user.userid, user.username, undefined, user.firstname, user.lastname, user.email);
}