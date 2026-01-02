import { Component, effect, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MemberForm } from '../member-form/member-form';
import { MembersStore } from '../../store/members/members.store';
import { Router } from '@angular/router';

@Component({
  selector: 'gen-member-add',
  imports: [MatCardModule, MemberForm],
  templateUrl: './member-add.html',
  styleUrl: './member-add.scss',
})
export class MemberAdd {

	private readonly membersStore = inject(MembersStore);
	private readonly router = inject(Router);

	constructor() {
		effect(() => {
			const addedMember = this.membersStore.processingMember();

			console.log('addedMember', addedMember);
		});
	}
}
