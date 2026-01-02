import { Component, effect, inject, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TranslatePipe } from '@ngx-translate/core';
import { Gender } from '../../store/members/gender';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MembersStore } from '../../store/members/members.store';
import { Member, MemberData } from '../../store/members/member';
import { MatRadioModule } from '@angular/material/radio';

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
		MatRadioModule,
	],
	templateUrl: './member-form.html',
	styleUrl: './member-form.scss',
})
export class MemberForm {
	private readonly membersStore = inject(MembersStore);
	processing = this.membersStore.processingMember;

	formData = input<MemberData | Member | null>();
	saveClicked = output<MemberData>();

	protected readonly memberForm = new FormGroup({
		firstName: new FormControl('', [Validators.required]),
		lastName: new FormControl('', [Validators.required]),
		maidenName: new FormControl(''),
		birthDate: new FormControl<string | null>(null),
		birthPlace: new FormControl(''),
		deathDate: new FormControl<string | null>(null),
		deathPlace: new FormControl(''),
		gender: new FormControl<Gender>(Gender.Male),
		notes: new FormControl(''),
	});

	constructor() {
		effect(() => {
			const data = this.formData();
			if (data) {
				this.memberForm.patchValue({
					firstName: data.firstName,
					lastName: data.lastName,
					maidenName: data.maidenName ?? '',
					birthDate: data.birthDate ?? null,
					birthPlace: data.birthPlace ?? '',
					deathDate: data.deathDate ?? null,
					deathPlace: data.deathPlace ?? '',
					gender: data.gender
				});
			} else {
				this.memberForm.reset({
					gender: Gender.Male,
				});
			}
		});
	}

	save(): void {
		if (this.memberForm.valid) {
			this.saveClicked.emit(this.memberForm.value as MemberData);
		} else {
			console.warn('Form is invalid', this.memberForm.errors);
		}
	}
}
