import { Component, inject, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MembersStore } from '../../store/members/members.store';
import { injectDispatch } from '@ngrx/signals/events';
import { membersEvents } from '../../store/members/members.events';
import { MatCardModule } from '@angular/material/card';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

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
		DatePipe,
		MatMenuModule,
	],
	templateUrl: './members-list.html',
	styleUrl: './members-list.scss',
})
export class MembersList {
	private readonly membersStore = inject(MembersStore);
	private readonly dispatch = injectDispatch(membersEvents);
	private readonly router = inject(Router);

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
		this.dispatch.search({ term: this.searchTerm, page: 1, pageSize: 20 });
	}

	addNew(): void {
		this.dispatch.addNew();
	}

	viewDetails(memberId: number): void {
		this.router.navigate(['/members', memberId]);
	}

	removeMember(memberId: number): void {
		this.dispatch.removeMember({ memberId });
	}

	editMember(memberId: number): void {
		this.dispatch.editMember({ memberId });
	}
}
