export class ReStatus {
    statusId: number;
    status: string;

    constructor(statusId = 0, status = '') {
        this.statusId = statusId;
        this.status = status;
    }
}