import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { TestPageModel } from "../model/test-page-model";
import { TestPageService } from "../service/test-page.service";
import { MatDialogRef } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { UpdateEntryComponent } from "./update-entry/update-entry.component";
import { NgDialogAnimationService } from "ng-dialog-animation";
import Swal from "sweetalert2";

@Component({
  selector: "vex-test-page",
  templateUrl: "./test-page.component.html",
  styleUrls: ["./test-page.component.scss"],
})
export class TestPageComponent implements OnInit {
  dataList: TestPageModel[];
  // isLoading: boolean;
  dataLength = 0;
  pageSize = 0;
  currentPage = 0;
  totalPage = 0;

  visibleColumns: Array<keyof TestPageModel | string>;
  dataSource = new MatTableDataSource<TestPageModel>();

  @ViewChild("deleteDialog") deleteConfirmationTemplate: TemplateRef<any>;
  deleteConfirmationDialogRef: MatDialogRef<any>;

  accountNumber = "";
  description = "";
  customerId = "";

  constructor(
    private testService: TestPageService,
    private dialog: NgDialogAnimationService
  ) {
    this.visibleColumns = this.displayedColumns.map(
      (column) => column.property
    );
  }

  ngOnInit(): void {
    this.loadDataList();
  }

  applyFilter(event: Event) {
    let filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadDataList() {
    // this.isLoading = true;
    this.testService.getDataList().subscribe(
      (response: any) => {
        console.log("Response: ", response);
        this.dataList = response.content;
        this.dataSource.data = this.dataList;
        this.updatePagination(response);
        // this.isLoading = false;
      },
      (error) => {
        console.error("Error: ", error);
        // this.isLoading = false;
      }
    );
  }

  refreshData(){
    this.accountNumber = "";
    this.description = "";
    this.customerId = "";
    this.loadDataList();
  }

  searchByParameters() {
    console.log("acn um: " + this.accountNumber);
    console.log("desc: " + this.description);
    console.log("cus Id: " + this.customerId);
    let parameter =
      "accountNo=" +
      this.accountNumber +
      "&description=" +
      this.description +
      "&customerId=" +
      this.customerId;
    // this.isLoading = true;
    this.testService.getSearchList(parameter).subscribe(
      (response: any) => {
        console.log("Response: ", response);
        this.dataList = response.content;
        this.dataSource.data = this.dataList;
        this.updatePagination(response);
        // this.isLoading = false;
      },
      (error) => {
        console.error("Error: ", error);
        // this.isLoading = false;
      }
    );
  }

  goToPage(page: number, size: number) {
    if (page>=0 && page<this.totalPage) {
      // this.isLoading = true;
      this.testService.getListByPagination(page, size).subscribe(
        (response: any) => {
          console.log("Response: ", response);
          this.dataList = response.content;
          this.dataSource.data = this.dataList;
          this.updatePagination(response);
          // this.isLoading = false;
        },
        (error) => {
          console.error("Error: ", error);
          // this.isLoading = false;
        }
      );
    }
  }

  updatePagination(response: any) {
    this.dataLength = response.totalElements;
    this.currentPage = response.pageable.pageNumber;
    this.pageSize = response.pageable.pageSize;
    this.totalPage = response.totalPages;
  }

  returnMin(a:number, b:number){
    return a<b?a:b;
  }

  onUpdateEvent(row: any) {
    const dialogRef = this.dialog.open(UpdateEntryComponent, {
      data: row,
      height: "100%",
      width: "50%",
      position: { right: "0px", top: "0px" },
      disableClose: true,
      closeOnNavigation: false,
      autoFocus: false,
      animation: { to: "left" },
    });
    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.addPanelClass("animate__slideOutRight");
      if (result == 0){
        this.goToPage(this.currentPage, this.pageSize);
      }
    });
  }

  //table structure
  displayedColumns: TableColumn<TestPageModel>[] = [
    {
      label: "#",
      property: "serialNo",
      type: "serial",
    },
    {
      label: "A/C NO",
      property: "accountNumber",
      type: "text",
    },
    {
      label: "CUSTOMER ID",
      property: "customerId",
      type: "text",
    },
    {
      label: "AMOUNT",
      property: "trxAmount",
      type: "number",
    },
    {
      label: "REMARKS",
      property: "description",
      type: "text",
    },
    {
      label: "TRX DATE",
      property: "trxDate",
      type: "text",
    },
    {
      label: "TRX TIME",
      property: "trxTime",
      type: "text",
    },
    {
      label: "ACTIONS",
      property: "actions",
      type: "button",
    },
  ];
}
