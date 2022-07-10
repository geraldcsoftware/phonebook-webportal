import { Component } from '@angular/core';
import { animate, state, style, transition, trigger } from "@angular/animations";
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { PhoneBookEntriesState } from "../../state/phone-book-entries-state";
import { ActivatedRoute } from "@angular/router";

const PHONE_NUMBER_REGEX = /^(\+|00)[1-9][0-9]{10,13}$/;

@Component({
    selector: 'app-add-phone-book-entry',
    templateUrl: './add-phone-book-entry.component.html',
    animations: [
        trigger('editButton', [
            state('edit', style({
                opacity: 0,
                display: 'none'
            })),
            state('*', style({
                opacity: 1,
                display: 'flex'
            })),
            transition('edit => *', [
                animate('0.3s')
            ]),
            transition('* => edit', [
                animate('0.3s')
            ]),
        ]),
        trigger('editForm', [
            state('*', style({
                opacity: 0,
                display: 'none'
            })),
            state('edit', style({
                opacity: 1,
                display: 'flex'
            })),
            transition('edit => *', [
                animate('0.3s')
            ]),
            transition('* => edit', [
                animate('0.3s')
            ]),
        ]),
    ],
})
export class AddPhoneBookEntryComponent {
    form: FormGroup = this.formBuilder.group({
        name: new FormControl('', [Validators.required]),
        phoneNumbers: this.formBuilder.array([new FormControl('',
            [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)])])
    });
    mode: 'edit' | undefined = undefined;

    get nameControl(): AbstractControl | null {
        return this.form.get('name');
    }

    get phoneNumbers(): FormArray | null {
        return this.form.get('phoneNumbers') as FormArray;
    }

    get phoneNumbersControls(): FormControl[] {
        return this.phoneNumbers?.controls as FormControl[];
    }

    constructor(private formBuilder: FormBuilder,
                private activatedRoute: ActivatedRoute,
                private phoneBookEntriesState: PhoneBookEntriesState) {
    }

    removePhoneNumber(index: number) {
        this.phoneNumbers?.removeAt(index);
    }

    addPhoneNumber() {
        this.phoneNumbers?.push(new FormControl('',
            [Validators.required, Validators.pattern(PHONE_NUMBER_REGEX)]));
    }

    submit() {
        const phoneBookId = this.activatedRoute.snapshot.queryParams['phoneBookId'];
        const entry = {
            name: this.nameControl?.value,
            phoneNumbers: this.phoneNumbers?.value as string[],
            phoneBookId
        }
        this.phoneBookEntriesState.addPhoneBookEntry(entry);
        this.mode = undefined;
        this.form.reset();
    }
}
