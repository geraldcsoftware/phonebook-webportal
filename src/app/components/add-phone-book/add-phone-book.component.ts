import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
    trigger,
    state,
    style,
    animate,
    transition
} from '@angular/animations';
import { PhoneBookListState } from "../../state/phone-book-list-state";

@Component({
    selector: 'app-add-phone-book',
    templateUrl: './add-phone-book.component.html',
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
export class AddPhoneBookComponent {

    form: FormGroup = this.formBuilder.group({
        name: new FormControl('', [Validators.required])
    });
    mode: 'edit' | undefined = undefined;

    get nameControl(): AbstractControl | null {
        return this.form.get('name');
    }

    constructor(private formBuilder: FormBuilder,
                private phoneBooksState: PhoneBookListState) {
    }


    submit(): void {
        this.phoneBooksState.addPhoneBook({ name: this.form.value.name });
        this.mode = undefined;
        this.form.reset();
    }
}
