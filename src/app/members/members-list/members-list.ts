import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MembersStore } from '../../store/members/members.store';
import { injectDispatch } from '@ngrx/signals/events';
import { membersEvents } from '../../store/members/members.events';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
	selector: 'gen-members-list',
	imports: [
		MatButtonModule,
		RouterLink,
		MatIconModule,
		NgxSkeletonLoaderModule,
		MatCardModule,
		MatFormFieldModule,
		FormsModule,
		MatInputModule,
	],
	templateUrl: './members-list.html',
	styleUrl: './members-list.scss',
})
export class MembersList {
	private readonly membersStore = inject(MembersStore);
	private readonly dispatch = injectDispatch(membersEvents);

	protected loading = this.membersStore.loading;
	protected members = this.membersStore.entities;

	searchTerm: string = '';

	ngOnInit(): void {
		if (!(!this.membersStore.term() && this.membersStore.ids().length > 0)) {
			this.dispatch.search({ term: '', page: 1, pageSize: 20 });
		}

		this.searchTerm = this.membersStore.term();
	}

	search(): void {
		console.log('Searching for', this.searchTerm);
		this.dispatch.search({ term: this.searchTerm, page: 1, pageSize: 20 });
		// this.dispatch.search({ term, page: 1, pageSize: 20 });
	}
}
