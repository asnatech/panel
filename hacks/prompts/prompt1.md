# Asnatech Panel

I want to create react project with typescript.

I have 3 access roles: `admin`, `verifier` and `constructor`

- if no token is saved in browser, user should redirected to auth page which has login
- if user has one, request the `appconfig/panels`, if 401 redirect to auth page otherwise show the panel, this api return which sidebar options user should see.
- currently I have 4 sidebar menues, `orders`, `user_mapping`, `report_template`, `documents` which based on appconfig users see them
- in `orders` tab:
  - user can see list
  - select an order which calls the detail api of order and show it
  - in detail tab, user can verify the request
- in `user_mapping` tab:
  - user can see the current mapping between products -> warehouses -> users (the response of this api is higher than other apis)
  - I want a table view which user can update the user-id and finally update them (put request for changed ones)
- `report_template`
  - a tab which user can retrieve the current report-template
  - see the content if exists
  - update the content
  - delete the template
- `documents`
  - user can see the list
  - click a document and see the detail of the document
  - there's a print or pdf button which calls the pdf api of backend to retrieve the pdf file

The panel should also contains a logout botton at the bottom of the tabbar.

Also The pannel should have i18n (english/persian) with ltr and rtl handling

For the design of website I want an awesome one.

## Backend APIs

### POST /auth/login

request:

```json
{
    "username": "test-admin",
    "password": "password"
}
```

response:

```json
{
    "access_token": "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI0IiwiYXVkIjpbImFwaSIsIndzIl0sImV4cCI6MTc4MjIwOTI2NSwiaWF0IjoxNzgyMTIyODY1LCJqdGkiOiJjNjY0MTY3MC0yZTZlLTQzZmItODYyYy02NmFmY2U1ZmU1ZGQiLCJ1c2VyX2lkIjoiNCIsInJvbGUiOiJhZG1pbiJ9.f3SRM0dZtOKYR7FyZQqcGpVvPWhQUBtOobyBcRjLWnf1Fe9dbMSquUPyoCNHVu_9ry1gF-lpMUE3ISi95kwFDA",
    "expires_in": 86400000000000,
    "token_type": "Bearer"
}
```

the result of `access_token` will be used as bearer auth in next requests

### Get /appconfig/panels

response:

```json
{
    "data": [
        "orders",
        "user_mapping",
        "report_template",
        "documents"
    ],
    "message": "Successfully retrieved panels"
}
```

this is the result for admin

verifier sees:

```json
{
    "data": [
        "orders",
        "documents"
    ],
    "message": "Successfully retrieved panels"
}
```

constructor sees:

```json
{
    "data": [
        "documents"
    ],
    "message": "Successfully retrieved panels"
}
```

### GET /orders

response:

```json
{
    "data": [
        {
            "id": 19649,
            "register_date": "2026-06-15T14:18:17.98+03:30",
            "status": "document_issued"
        },
        {
            "id": 19650,
            "register_date": "2026-06-15T14:31:06.95+03:30",
            "status": "retrieved"
        },
        {
            "id": 19669,
            "register_date": "2026-06-15T15:20:44.653+03:30",
            "status": "retrieved"
        }
    ]
}
```

statuses are:
- retrieved
- verified
- document_issued

### GET /orders/19669

response:

```json
{
    "data": {
        "id": 19669,
        "register_date": "2026-06-16T20:25:32+03:30",
        "ideal_crm": {
            "ApiOrderID": 19669,
            "ApiOrderOprID": 2,
            "ApiOrderOpr": "فاکتور فروش غیر رسمی",
            "ApiPreOrderId": 0,
            "ApiPreOrderTitle": "",
            "ApiPreOrderVerifierId": 0,
            "ApiPreOrderVerifier": "سید مجتبی قریشی",
            "ApiOrdNumber": 9234520,
            "ApiOrdDate": "14050326",
            "ApiOrdCompanyId": 2322,
            "ApiOrdCompany": "شرکت محترم ایران صنعت",
            "ApiOrdCompanyPersonId": 3459,
            "ApiOrdCompanyPerson": "جناب آقای  قریشی",
            "ApiOrdProjectId": 11183,
            "ApiOrdProject": "بازاریابی پیام رسان 1",
            "ApiOrdItemCount": 3,
            "ApiOrdItemsAmount": 231600000,
            "ApiOrdDiscount": 0,
            "ApiOrdSumAmount": 231600000,
            "ApiOrdTax": 0,
            "ApiOrdCalculateTax": false,
            "ApiOrdTotalAmount": 231600000,
            "ApiOrdTotalAmountStr": "دويست و سي و يك ميليون و ششصد هزار",
            "ApiOrdIsVerified": false,
            "ApiOrdVerifiedRegisterDate": "",
            "ApiOrdVerifiedRegisterDatePersian": "",
            "ApiOrdStatusId": 1,
            "ApiOrdStatus": "تسویه نشده",
            "ApiOrdIsFixed": false,
            "ApiOrdGuarantyId": 2,
            "ApiOrdGuaranty": "5 سال",
            "ApiOrdDescriptionI": "سلام 1",
            "ApiOrdDescriptionII": "سلام 2",
            "ApiOrdPrintFormatId": 7,
            "ApiOrdPrintFormat": "خام",
            "ApiOrdImportDate": "14050326",
            "ApiFPId": 1,
            "ApiOrdVerifierId": 0,
            "ApiOrdVerifier": "",
            "ApiOrdDay": "3",
            "ApiOrdTime": "16:55:32",
            "ApiOrdReferUserId": 57,
            "ApiOrdReferUser": "فرشاد واثقی",
            "ApiOrdNote": "سلام4",
            "ApiOrdDateTime": "2026-06-16T16:55:32",
            "ApiOrdImportDateTime": "2026-06-16T16:55:32",
            "ApiOrdSerial": "",
            "ApiUserId": 56,
            "ApiEditUser": "سید مجتبی قریشی",
            "ApiRegisterDate": "2026-06-21T16:58:16.55",
            "ApiFirstRegisterUserId": 56,
            "ApiFirstRegisterUser": "سید مجتبی قریشی",
            "ApiFirstRegisterDate": "2026-06-16T16:55:53.66",
            "ApiOrdDeliveryTermId": 4,
            "ApiOrdCId": 1,
            "ApiOrdCenterName": "مرکز اصلی",
            "ApiOrdLinkAccConflict": false,
            "ApiOrdLinkAccData": ""
        },
        "status": "document_issued"
    },
    "message": "Successfully retrieved order detail"
}

```

### POST /orders/19669/verify

request:

```json
{}
```

response:

```json
{
    "message": "Order verified successfully"
}
```

### GET /report_template

response:

```json
{
    "data": "<!DOCTYPE html>\n<html lang=\"fa\" dir=\"rtl\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>{{.PrintDraft.Title}}</title>\n  <style>\n    @import url('https://fonts.googleapis.com/css2?family=Vazirmatn:wght@400;700&display=swap');\n\n    * { box-sizing: border-box; margin: 0; padding: 0; }\n\n    body {\n      font-family: 'Vazirmatn', 'B Nazanin', Arial, sans-serif;\n      font-size: 10px;\n      color: #000;\n      width: 100%;\n      padding: 4mm 4mm 6mm;\n      direction: rtl;\n    }\n\n    /* ===== PAGE HEADER ===== */\n    .page-header {\n      border: 1px solid #000;\n      padding: 10px;\n      margin-bottom: 12px;\n      position: relative;\n    }\n\n    .page-header .warehouse-logo-box {\n      border: 1px solid #000;\n      display: inline-block;\n      padding: 6px 14px;\n      font-size: 15px;\n      font-weight: bold;\n      text-align: center;\n      min-width: 120px;\n      margin-bottom: 6px;\n    }\n\n    .header-grid {\n      display: grid;\n      grid-template-columns: 1fr 1fr;\n      gap: 6px;\n      margin-top: 6px;\n    }\n\n    .header-title {\n      grid-column: 1 / -1;\n      text-align: center;\n      font-size: 17px;\n      font-weight: bold;\n      padding: 4px 0 8px;\n    }\n\n    .header-field {\n      font-size: 11px;\n      font-weight: bold;\n      padding: 4px 0;\n    }\n\n    .header-bottom-row {\n      display: flex;\n      gap: 8px;\n      align-items: stretch;\n      margin-bottom: 6px;\n    }\n\n    .header-bottom-row .warehouse-logo-box {\n      margin-bottom: 0;\n      white-space: nowrap;\n    }\n\n    .header-bottom-row .delivery-term-box {\n      flex: 1;\n      margin-top: 0;\n    }\n\n    .delivery-term-box {\n      border: 1px dashed #000;\n      text-align: center;\n      font-size: 14px;\n      font-weight: bold;\n      padding: 8px;\n      margin-top: 6px;\n      min-height: 36px;\n    }\n\n    /* ===== CUSTOMER SECTION ===== */\n    .customer-section {\n      border: 1px solid #000;\n      padding: 10px;\n      margin-bottom: 12px;\n    }\n\n    .customer-name {\n      font-size: 13px;\n      font-weight: bold;\n      text-align: center;\n      padding-bottom: 6px;\n    }\n\n    .customer-inline {\n      font-size: 13px;\n      font-weight: bold;\n      padding: 4px 0;\n      text-align: right;\n    }\n\n    /* ===== ITEMS TABLE ===== */\n    .items-table {\n      width: 100%;\n      border-collapse: collapse;\n      margin-bottom: 12px;\n    }\n\n    .items-table thead th {\n      background-color: #d9d9d9;\n      border: 1px solid #000;\n      padding: 8px;\n      text-align: center;\n      font-size: 12px;\n      font-weight: bold;\n    }\n\n    /* Each item group row */\n    .items-table tbody tr.item-row td {\n      border-top: 1px solid #ccc;\n      border-left: 1px solid #000;\n      border-right: 1px solid #000;\n      border-bottom: 1px solid #ccc;\n      background-color: #ffffff;\n    }\n\n    .items-table tbody tr.item-row:last-child td {\n      border-bottom: 1px solid #000;\n    }\n\n\n    /* Override row-num and quantity always */\n    td.row-num {\n      text-align: center;\n      font-weight: bold;\n      font-size: 11px;\n      background-color: #d9d9d9 !important;\n      width: 40px;\n      vertical-align: middle;\n    }\n\n    td.unit {\n      text-align: center;\n      font-size: 10px;\n      width: 45px;\n      vertical-align: middle;\n      white-space: nowrap;\n    }\n\n    td.quantity {\n      text-align: center;\n      font-weight: bold;\n      font-size: 11px;\n      width: 55px;\n      vertical-align: middle;\n      white-space: nowrap;\n    }\n\n    /* Product cell has no padding — inner divs control spacing */\n    td.product-cell {\n      padding: 0 !important;\n      vertical-align: top;\n    }\n\n    .product-name-text {\n      font-size: 12px;\n      font-weight: bold;\n      text-align: right;\n      padding: 8px 10px 6px;\n    }\n\n    /* Serials block sits flush below the product name inside the same cell */\n    .serials-block {\n      border-top: 1px dashed #999;\n      padding: 5px 8px 7px;\n    }\n\n    .serials-label {\n      font-size: 9px;\n      font-weight: bold;\n      color: #555;\n      margin-bottom: 5px;\n    }\n\n    .serials-grid {\n      display: flex;\n      flex-wrap: wrap;\n      gap: 4px;\n    }\n\n    .serial-chip {\n      border: 1px solid #888;\n      border-radius: 2px;\n      padding: 2px 7px;\n      font-size: 8px;\n      font-weight: normal;\n      background: #fff;\n      white-space: nowrap;\n    }\n\n    /* ===== SUMMARY SECTION ===== */\n    .items-table {\n      margin-bottom: 0;\n    }\n\n    .summary-section {\n      margin-top: 6px;\n    }\n\n    .total-row {\n      display: flex;\n      border: 1px solid #000;\n      margin-top: 8px;\n      margin-bottom: 8px;\n    }\n\n    .total-label {\n      border-left: 1px solid #000;\n      padding: 7px 12px;\n      font-size: 11px;\n      font-weight: bold;\n      text-align: center;\n      flex: 1;\n    }\n\n    .total-value {\n      padding: 7px 12px;\n      font-size: 11px;\n      font-weight: bold;\n      text-align: center;\n      width: 150px;\n    }\n\n    .notes-box {\n      border: 1px solid #000;\n      padding: 8px;\n      font-size: 11px;\n      font-weight: bold;\n      min-height: 70px;\n      margin-bottom: 8px;\n      text-align: right;\n    }\n\n    .notes-row {\n      padding: 4px 0;\n      line-height: 1.7;\n    }\n\n    .notes-label {\n      font-weight: bold;\n    }\n\n    .notes-desc {\n      margin-top: 4px;\n      font-weight: normal;\n      line-height: 1.8;\n    }\n\n    .notes-desc-sep {\n      height: 6px;\n    }\n\n    /* ===== SIGN-OFF TABLE ===== */\n    .signoff-container {\n      border: 1px solid #000;\n      margin-top: 8px;\n    }\n\n    .signoff-table {\n      width: 100%;\n      border-collapse: collapse;\n    }\n\n    .signoff-table th {\n      border: 1px solid #000;\n      padding: 8px 4px;\n      text-align: center;\n      font-size: 9px;\n      font-weight: bold;\n      background-color: #fff;\n      height: 60px;\n      vertical-align: bottom;\n    }\n\n    .signoff-table td.label-row {\n      border: 1px solid #000;\n      padding: 4px;\n      text-align: center;\n      font-size: 7px;\n      font-weight: bold;\n    }\n\n    .signoff-table td.sign-area {\n      border: 1px solid #000;\n      height: 50px;\n    }\n  </style>\n</head>\n<body>\n\n  <!-- ===== PAGE HEADER BAND ===== -->\n  <div class=\"page-header\">\n    <div class=\"header-title\">{{.PrintDraft.Title}}</div>\n\n    <div class=\"header-grid\">\n      <div class=\"header-field\">شماره حواله: {{.PrintDraft.DocNumber}}</div>\n      <div class=\"header-field\">تاریخ حواله: {{.PrintDraft.DocDate}}</div>\n\n      <div class=\"header-field\">شماره فاکتور: {{.PrintDraft.SaleOrderNumber}}</div>\n      <div class=\"header-field\">ارجاع دهنده: {{.PrintDraft.ordReferUser}}</div>\n    </div>\n\n    <div class=\"header-bottom-row\">\n      {{if .PrintDraft.WareHouse}}<div class=\"warehouse-logo-box\">{{.PrintDraft.WareHouse}}</div>{{end}}\n      {{if .PrintDraft.ordDeliveryTerm}}<div class=\"delivery-term-box\">{{.PrintDraft.ordDeliveryTerm}}</div>{{end}}\n    </div>\n\n  </div>\n\n  <!-- ===== CUSTOMER / RECIPIENT SECTION ===== -->\n  <div class=\"customer-section\">\n    <div class=\"customer-name\">\n      {{.PrintDraft.Company}}\n      {{if .PrintDraft.ordCompanyPerson}}({{.PrintDraft.ordCompanyPerson}}){{end}}\n    </div>\n\n    {{if .PrintDraft.prsMobile}}<div class=\"customer-inline\">شماره همراه: {{.PrintDraft.prsMobile}}</div>{{end}}\n    {{if .PrintDraft.cmpAddress}}<div class=\"customer-inline\">آدرس: {{.PrintDraft.cmpAddress}}</div>{{end}}\n  </div>\n\n  <!-- ===== ITEMS TABLE ===== -->\n  <table class=\"items-table\">\n    <thead>\n      <tr>\n        <th style=\"width:40px\">ردیف</th>\n        <th>نام کالا</th>\n        <th style=\"width:45px\">واحد</th>\n        <th style=\"width:55px\">تعداد</th>\n      </tr>\n    </thead>\n    <tbody>\n      {{range $i, $item := .Items}}\n      <tr class=\"item-row\">\n        <td class=\"row-num\">{{add $i 1}}</td>\n        <td class=\"product-cell\">\n          <div class=\"product-name-text\">{{$item.Name}}</div>\n          {{if $item.Serials}}\n          <div class=\"serials-block\">\n            <div class=\"serials-label\">سریال‌ها:</div>\n            <div class=\"serials-grid\">\n              {{range $item.Serials}}\n              <span class=\"serial-chip\">{{.}}</span>\n              {{end}}\n            </div>\n          </div>\n          {{end}}\n        </td>\n        <td class=\"unit\">{{$item.Unit}}</td>\n        <td class=\"quantity\">{{formatQty $item.Quantity}}</td>\n      </tr>\n      {{end}}\n    </tbody>\n  </table>\n  <div class=\"total-row\">\n    <div class=\"total-label\">جمع کل تعداد :</div>\n    <div class=\"total-value\">{{sumQty .Items}}</div>\n  </div>\n\n  <!-- ===== SUMMARY SECTION ===== -->\n  <div class=\"summary-section\">\n\n    {{if or .PrintDraft.ordNote .PrintDraft.Description1 .PrintDraft.Description2}}\n    <div class=\"notes-box\">\n      {{if .PrintDraft.ordNote}}<div class=\"notes-row\"><span class=\"notes-label\">یادداشت:</span> {{.PrintDraft.ordNote}}</div>{{end}}\n      {{if or .PrintDraft.Description1 .PrintDraft.Description2}}\n      <div class=\"notes-row\">\n        <span class=\"notes-label\">توضیحات:</span>\n        <div class=\"notes-desc\">\n          {{if .PrintDraft.Description1}}<div>{{.PrintDraft.Description1}}</div>{{end}}\n          {{if and .PrintDraft.Description1 .PrintDraft.Description2}}<div class=\"notes-desc-sep\"></div>{{end}}\n          {{if .PrintDraft.Description2}}<div>{{.PrintDraft.Description2}}</div>{{end}}\n        </div>\n      </div>\n      {{end}}\n    </div>\n    {{end}}\n\n    <!-- Sign-off / production stages table -->\n    <div class=\"signoff-container\">\n      <table class=\"signoff-table\">\n        <thead>\n          <tr>\n            <th>شروع آماده سازی</th>\n            <th>برش</th>\n            <th>مونتاژ</th>\n            <th>ساخته شد</th>\n            <th>ثبت گارانتی</th>\n            <th>ارسال شد</th>\n          </tr>\n        </thead>\n        <tbody>\n          <tr>\n            <td class=\"label-row\">ثبت سیستمی</td>\n            <td class=\"label-row\">ثبت سیستمی</td>\n            <td class=\"label-row\">ثبت سیستمی</td>\n            <td class=\"label-row\">ثبت سیستمی</td>\n            <td class=\"label-row\">ثبت سیستمی</td>\n            <td class=\"label-row\">ثبت سیستمی</td>\n          </tr>\n          <tr>\n            <td class=\"sign-area\"></td>\n            <td class=\"sign-area\"></td>\n            <td class=\"sign-area\"></td>\n            <td class=\"sign-area\"></td>\n            <td class=\"sign-area\"></td>\n            <td class=\"sign-area\"></td>\n          </tr>\n        </tbody>\n      </table>\n    </div>\n\n  </div>\n\n</body>\n</html>\n",
    "message": "Successfully retrieved report-template"
}
```

### POST /report_template

request is a raw text (html in my case)

### DELETE /report_template

### GET /user_mapping

```json
{
    "data": {
        "mapping": {
            "7": {
                "1": 3,
                "2": 0,
                "3": 0
            },
            "8": {
                "1": 0,
                "2": 0,
                "3": 0
            },
            "9": {
                "1": 0,
                "2": 0,
                "3": 0
            },
            "10": {
                "1": 0,
                "2": 0,
                "3": 0
            }
        },
        "products": [
            {
                "id": 50,
                "name": "ریل کنار رو پانچی یک طرفه"
            },
            {
                "id": 33,
                "name": "ریل کناررو m20 یک طرفه"
            },
            {
                "id": 97,
                "name": "ریل کناررو m20 دو طرفه"
            },
            {
                "id": 98,
                "name": "ریل کناررو m21 یک طرفه"
            },
            {
                "id": 51,
                "name": "ریل خام پانچی"
            },
            {
                "id": 99,
                "name": "ریل کناررو m21 دو طرفه"
            },
            {
                "id": 100,
                "name": "ریل کناررو m20 یک طرفه منحنی"
            },
            {
                "id": 101,
                "name": "ریل کناررو m20 دو طرفه منحنی"
            },
            {
                "id": 7,
                "name": "موتور 1.6 نیوتن ساده"
            },
            {
                "id": 8,
                "name": "موتور 1.6 نیوتن پالسی"
            },
            {
                "id": 102,
                "name": "ریل کناررو m21 یک طرفه منحنی"
            }
        ],
        "users": [
            {
                "id": 4,
                "username": "test-admin"
            },
            {
                "id": 3,
                "username": "test-constructor"
            }
        ],
        "warehouses": [
            {
                "id": 1,
                "name": "انبار اصفهان"
            },
            {
                "id": 2,
                "name": "انبار تهران"
            },
            {
                "id": 3,
                "name": "انبار مرکزی"
            }
        ]
    },
    "message": "Successfully retrieved user-mappings"
}
```

I'll return all the possible mapping which I want the user be able to update the mappings

- mapping is a mapping from product-id -> warehouse-id -> user-id
- I trunicate the products and mappings

### PUT /user_mapping

```json
{
    "69": {
        "2": 3
    }
}
```

### GET /documents

response

```json
{
    "data": [
        {
            "id": 19116,
            "order_id": 19669,
            "register_date": "2026-06-22T12:54:49.311219+03:30"
        },
        {
            "id": 19117,
            "order_id": 19669,
            "register_date": "2026-06-22T12:54:49.685105+03:30"
        },
        {
            "id": 19118,
            "order_id": 19669,
            "register_date": "2026-06-22T13:41:45.28357+03:30"
        },
        {
            "id": 19119,
            "order_id": 19669,
            "register_date": "2026-06-22T13:41:45.677006+03:30"
        }
    ],
    "message": "Successfully retrieved documents"
}
```

### GET /documents/19117

response

```json
{
    "data": {
        "id": 19117,
        "order_id": 19669,
        "register_date": "2026-06-22T12:54:49.685105+03:30",
        "ideal_crm": {
            "ApiDocID": 19117,
            "ApiOprId": 2,
            "ApiOpr": "حواله خروج از انبار با فروش",
            "ApiDocNumber": 17438,
            "ApiDocDate": "14050401",
            "ApiIsFix": 0,
            "ApiWHId": 1,
            "ApiWH": "انبار اصفهان",
            "ApiFPId": 1,
            "ApiOrderId": 19669,
            "ApiDocDateTime": "2026-06-22T00:00:00",
            "ApiCompanyId": 2322,
            "ApiCompany": "شرکت محترم ایران صنعت",
            "ApiCompanyPersonId": 3459,
            "ApiCompanyPerson": "جناب آقای  قریشی",
            "ApiProjectId": 11183,
            "ApiProject": "بازاریابی پیام رسان 1",
            "ApiUserId": 69,
            "ApiEditUser": "نیما افشارپور",
            "ApiRegisterDate": "2026-06-22T12:54:32.367",
            "ApiFirstRegisterUserId": 69,
            "ApiFirstRegisterUser": "نیما افشارپور",
            "ApiFirstRegisterDate": "2026-06-22T12:54:32.367",
            "ApiDocLinkAccData": "",
            "ApiDocCId": 1
        }
    },
    "message": "Successfully retrieved document detail"
}
```

### GET /documents/19117/pdf

response is a pdf file `application/pdf`
