import { User } from "../models/User.model";
import { Subject } from "rxjs/Subject";


export class UserService{

	private users: User[] = [
		{
			firstName: 'Gilius',
			lastName: 'Blanchard',
			email: 'neworldwebsites@gmail.com',
			drinkPreference: 'fanta',
			hobbies: [
				'coding',
				'Dégustation de café'	]			
		}
	];

	userSubject = new Subject<User[]>();

	emitUsers() {
		this.userSubject.next(this.users.slice());
	}

	addUser(user: User) {
		this.users.push(user);
		this.emitUsers();
	}


}