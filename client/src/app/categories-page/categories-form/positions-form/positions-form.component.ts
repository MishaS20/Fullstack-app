import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interfaces';
import { PositionsService } from 'src/app/shared/services/positions.services';

@Component({
    selector: 'app-positions-form',
    templateUrl: './positions-form.component.html',
    styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input('categoryId') categoryID: string
    @ViewChild('modal') modalRef: ElementRef
    form: FormGroup
    positions: Position[] = []
    positionId: any = null
    loading = false
    modal: MaterialInstance

    constructor(private positionsService: PositionsService) { }

    ngOnInit(): void {
        this.form = new FormGroup({ title: new FormControl(null, Validators.required) })

        this.loading = true
        this.positionsService.fetch(this.categoryID).subscribe(
            positions => {
                this.positions = positions
                this.loading = false
            }
        )
    }
    ngOnDestroy() {
        this.modal.destroy()
    }

    ngAfterViewInit() {
        this.modal = MaterialService.initModal(this.modalRef)
    }

    onSelectPosition(position: Position) {
        this.positionId = position._id
        this.form.patchValue({
            title: position.title
        })
        this.modal.open()
        MaterialService.updateTextInput()
    }

    onAddPosition() {
        this.positionId = null
        this.form.reset({ title: null })
        this.modal.open()
        MaterialService.updateTextInput()
    }

    onCancel() {
        this.modal.close()
    }

    onDeletePosition(event: Event, position: Position) {
        event.stopPropagation()
        const decision = window.confirm(`Вы действительно хотите удалить ${position.title} ?`)
        if (decision) {
            this.positionsService.delete(position).subscribe(
                response => {
                    const idx = this.positions.findIndex(p => p._id === position._id)
                    this.positions.splice(idx, 1)
                    MaterialService.toast(response.message)
                },
                error => MaterialService.toast(error.error.message)
            )
        }
    }

    onSubmit() {

        this.form.disable()
        const newPosition: Position = {
            title: this.form.value.title,
            category: this.categoryID
        }

        const completed = () => {
            this.modal.close()
            this.form.reset({ title: '' })
            this.form.enable()
        }

        if (this.positionId) {
            newPosition._id = this.positionId
            this.positionsService.update(newPosition).subscribe(
                position => {
                    const idx = this.positions.findIndex(p => p._id === position._id)
                    this.positions[idx] = position
                    MaterialService.toast("Позиция была обновлена")
                },
                error => MaterialService.toast(error.error.message),
                completed
            )
        } else {
            this.positionsService.create(newPosition).subscribe(
                position => {
                    MaterialService.toast("Позиция была добавлена")
                    this.positions.push(position)
                },
                error => MaterialService.toast(error.error.message),
                completed
            )
        }

    }

}
