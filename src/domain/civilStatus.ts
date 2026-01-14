export class CivilStatus {
    id?: number;
    last_name: string;
    first_name: string;
    birthplace: string;
    birthday: string;

    constructor(last_name: string, first_name: string, birthplace: string, birthday: string, id?: number) {
        this.id = id;
        this.last_name = last_name;
        this.first_name = first_name;
        this.birthplace = birthplace;
        this.birthday = birthday;
    }
}