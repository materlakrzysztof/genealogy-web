import { Component, inject } from '@angular/core';
import { MembersStore } from '../../store/members/members.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'gen-members-details',
  imports: [],
  templateUrl: './members-details.html',
  styleUrl: './members-details.scss',
})
export class MembersDetails {
	private readonly membersStore = inject(MembersStore);
	private readonly route = inject(ActivatedRoute);

	constructor() {
		const memberId = Number(this.route.snapshot.paramMap.get('id'));
		// Load member details if needed
	}


}
