import { Pipe, PipeTransform } from '@angular/core';
import { UserRole } from '../../store/users/user';

@Pipe({
	name: 'userRole',
})
export class UserRolePipe implements PipeTransform {
	transform(roles: UserRole): string {
		if (roles === UserRole.None) return 'None';

		const names: string[] = [];
		if (roles & UserRole.User) names.push('User');
		if (roles & UserRole.Admin) names.push('Admin');

		return names.join(', ');
	}
}
