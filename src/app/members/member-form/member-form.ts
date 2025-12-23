import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { Gender } from '../../store/members/gender';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { membersEvents } from '../../store/members/members.events';
import { injectDispatch } from '@ngrx/signals/events';
import { MembersStore } from '../../store/members/members.store';

@Component({
	selector: 'gen-member-form',
	imports: [
		MatFormFieldModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatInputModule,
		TranslatePipe,
		MatIconModule,
		MatDatepickerModule,
	],
	templateUrl: './member-form.html',
	styleUrl: './member-form.scss',
})
export class MemberForm {
	
	private readonly membersStore = inject(MembersStore);
	private readonly dispatch = injectDispatch(membersEvents);

	protected readonly memberForm = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		maidenName: new FormControl(''),
		birthDate: new FormControl(null),
		birthPlace: new FormControl(''),
		deathDate: new FormControl(null),
		deathPlace: new FormControl(''),
		gender: new FormControl<Gender>(Gender.Male),
		notes: new FormControl(''),
	});

	save(): void {
		this.membersStore.createMember({
			firstName: this.memberForm.value.firstName!,
			lastName: this.memberForm.value.lastName!,
			maidenName: this.memberForm.value.maidenName ?? null,
			birthDate: this.memberForm.value.birthDate ?? null,
			birthPlace: this.memberForm.value.birthPlace ?? null,
			deathDate: this.memberForm.value.deathDate ?? null,
			deathPlace: this.memberForm.value.deathPlace ?? null,
			gender: this.memberForm.value.gender!,
			notes: this.memberForm.value.notes ?? null
		});
	}
}
