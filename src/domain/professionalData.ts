export class ProfessionalData {
    id?: number;
    civil_status_id?: number;
    situation: string;
    company: string;
    salary: number;
    contract: string;
    hours_per_day: number;
    overtime: number;
    paid_overtime: number;

    constructor(civil_status_id: number, situation: string, company: string, salary: number, contract: string, hours_per_day: number, overtime: number, paid_overtime: number, id?: number) {
        this.id = id;
        this.civil_status_id = civil_status_id;
        this.situation = situation;
        this.company = company;
        this.salary = salary;
        this.contract = contract;
        this.hours_per_day = hours_per_day;
        this.overtime = overtime;
        this.paid_overtime = paid_overtime;
    }
}