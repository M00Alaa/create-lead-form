import { Component, HostListener, inject, TemplateRef } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isMobile: boolean = false;

  current = 0;

  inputsActiveArray: { id: number, icon: string, inputName: string }[] = [
    {
      id: 0,
      icon: 'bx bx-user',
      inputName: 'حقل أسم العميل',
    },
    {
      id: 1,
      icon: 'bx bx-phone',
      inputName: 'حقل رقم الهاتف',
    },
    {
      id: 2,
      icon: 'bx bx-mail-send',
      inputName: 'حقل البريد الألكتروني',
    },
    {
      id: 3,
      icon: 'bx bx-building-house',
      inputName: 'حقل المنتجات',
    },

  ]

  inputsInactiveArray: { id: number, icon: string, inputName: string }[] = [
    {
      id: 4,
      icon: 'bx bx-list-ul',
      inputName: 'حقل مخصص 1',
    },
    {
      id: 5,
      icon: 'bx bx-list-ul',
      inputName: 'حقل مخصص 2',
    },
    {
      id: 6,
      icon: 'bx bx-list-ul',
      inputName: 'حقل مخصص 3',
    },
  ];

  products = [
    {
      id: 0,
      name: 'منتج 1',
      price: 10000,
      quantity: 1,
    },
    {
      id: 1,
      name: 'منتج 1',
      price: 10000,
      quantity: 1,
    },
    {
      id: 2,
      name: 'منتج 1',
      price: 10000,
      quantity: 1,
    },
    {
      id: 3,
      name: 'منتج 1',
      price: 10000,
      quantity: 1,
    },
    {
      id: 4,
      name: 'منتج 1',
      price: 10000,
      quantity: 1,
    },
  ]

  secStepArray: { id: number, icon: string, inputName: string }[] = [
    {
      id: 0,
      icon: 'bx bx-cloud-upload',
      inputName: 'قم برفع شعارك',
    },
    {
      id: 1,
      icon: '',
      inputName: 'عنوان المبادرة',
    },
    {
      id: 2,
      icon: '',
      inputName: 'وصف المبادرة',
    },
    {
      id: 3,
      icon: 'bx bx-image-add',
      inputName: 'قم برفع صورة',
    },
  ]

  secInStepArray: { id: number, icon: string, inputName: string }[] = []

  selectedValues: any[] = []; // Initialize as an empty array
  select = 0;

  constructor() {
  }

  selectCard(product: any) {
    const index = this.selectedValues.indexOf(product);
    if (index === -1) {
      this.selectedValues.push(product); // Add to selected if not already selected
    } else {
      this.selectedValues.splice(index, 1); // Remove from selected if already selected
    }
  }

  submitSelection() {
    console.log('Selected products:', this.selectedValues);
  }




  removeInput(id: number) {
    if (this.current == 0) {
      // Find the index of the object with the matching id
      const index = this.inputsActiveArray.findIndex(input => input.id === id);

      // Check if the object is found
      if (index !== -1) {
        // Push the found object into the inputsInactiveArray
        this.inputsInactiveArray.push(this.inputsActiveArray[index]);

        // Remove the object from inputsActiveArray
        this.inputsActiveArray.splice(index, 1);
      }
    } else if (this.current == 1) {
      // Find the index of the object with the matching id
      const index = this.secStepArray.findIndex(input => input.id === id);

      // Check if the object is found
      if (index !== -1) {
        // Push the found object into the secInStepArray
        this.secInStepArray.push(this.secStepArray[index]);

        // Remove the object from secStepArray
        this.secStepArray.splice(index, 1);
      }
    }
  }


  addInput(id: number) {
    if (this.current == 0) {
      // Find the index of the object with the matching id in the inputsInactiveArray
      const index = this.inputsInactiveArray.findIndex(input => input.id === id);

      // Check if the object is found
      if (index !== -1) {
        // Push the found object back into inputsActiveArray
        this.inputsActiveArray.push(this.inputsInactiveArray[index]);

        // Remove the object from inputsInactiveArray
        this.inputsInactiveArray.splice(index, 1);
      }
    }
    else if (this.current == 1) {
      // Find the index of the object with the matching id in the secInStepArray
      const index = this.secInStepArray.findIndex(input => input.id === id);

      // Check if the object is found
      if (index !== -1) {
        // Push the found object back into secStepArray
        this.secStepArray.push(this.secInStepArray[index]);

        // Remove the object from secInStepArray
        this.secInStepArray.splice(index, 1);
      }
    }
  }

  private modalService = inject(NgbModal);
  closeResult = '';

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }


  nextStep() {
    this.current = this.current + 1
  }

  prevStep() {
    this.current = this.current - 1
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenWidth();
  }

  ngOnInit() {
    this.checkScreenWidth();
  }

  checkScreenWidth() {
    this.isMobile = window.innerWidth < 768; // Set the breakpoint for mobile (768px or any other size)
  }
}
