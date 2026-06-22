export type PanelId = 'orders' | 'user_mapping' | 'report_template' | 'documents'

export type OrderStatus = 'retrieved' | 'verified' | 'document_issued'

export interface ApiResponse<T> {
  data: T
  message: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  expires_in: number
  token_type: string
}

export interface OrderListItem {
  id: number
  register_date: string
  status: OrderStatus
}

export interface IdealCrmOrder {
  ApiOrderID: number
  ApiOrderOprID: number
  ApiOrderOpr: string
  ApiPreOrderId: number
  ApiPreOrderTitle: string
  ApiPreOrderVerifierId: number
  ApiPreOrderVerifier: string
  ApiOrdNumber: number
  ApiOrdDate: string
  ApiOrdCompanyId: number
  ApiOrdCompany: string
  ApiOrdCompanyPersonId: number
  ApiOrdCompanyPerson: string
  ApiOrdProjectId: number
  ApiOrdProject: string
  ApiOrdItemCount: number
  ApiOrdItemsAmount: number
  ApiOrdDiscount: number
  ApiOrdSumAmount: number
  ApiOrdTax: number
  ApiOrdCalculateTax: boolean
  ApiOrdTotalAmount: number
  ApiOrdTotalAmountStr: string
  ApiOrdIsVerified: boolean
  ApiOrdVerifiedRegisterDate: string
  ApiOrdVerifiedRegisterDatePersian: string
  ApiOrdStatusId: number
  ApiOrdStatus: string
  ApiOrdIsFixed: boolean
  ApiOrdGuarantyId: number
  ApiOrdGuaranty: string
  ApiOrdDescriptionI: string
  ApiOrdDescriptionII: string
  ApiOrdPrintFormatId: number
  ApiOrdPrintFormat: string
  ApiOrdImportDate: string
  ApiFPId: number
  ApiOrdVerifierId: number
  ApiOrdVerifier: string
  ApiOrdDay: string
  ApiOrdTime: string
  ApiOrdReferUserId: number
  ApiOrdReferUser: string
  ApiOrdNote: string
  ApiOrdDateTime: string
  ApiOrdImportDateTime: string
  ApiOrdSerial: string
  ApiUserId: number
  ApiEditUser: string
  ApiRegisterDate: string
  ApiFirstRegisterUserId: number
  ApiFirstRegisterUser: string
  ApiFirstRegisterDate: string
  ApiOrdDeliveryTermId: number
  ApiOrdCId: number
  ApiOrdCenterName: string
  ApiOrdLinkAccConflict: boolean
  ApiOrdLinkAccData: string
  [key: string]: unknown
}

export interface OrderDetail {
  id: number
  register_date: string
  ideal_crm: IdealCrmOrder
  status: OrderStatus
}

export interface DocumentListItem {
  id: number
  order_id: number
  register_date: string
}

export interface IdealCrmDocument {
  ApiDocID: number
  ApiOprId: number
  ApiOpr: string
  ApiDocNumber: number
  ApiDocDate: string
  ApiIsFix: number
  ApiWHId: number
  ApiWH: string
  ApiFPId: number
  ApiOrderId: number
  ApiDocDateTime: string
  ApiCompanyId: number
  ApiCompany: string
  ApiCompanyPersonId: number
  ApiCompanyPerson: string
  ApiProjectId: number
  ApiProject: string
  ApiUserId: number
  ApiEditUser: string
  ApiRegisterDate: string
  ApiFirstRegisterUserId: number
  ApiFirstRegisterUser: string
  ApiFirstRegisterDate: string
  ApiDocLinkAccData: string
  ApiDocCId: number
  [key: string]: unknown
}

export interface DocumentDetail {
  id: number
  order_id: number
  register_date: string
  ideal_crm: IdealCrmDocument
}

export interface UserMappingProduct {
  id: number
  name: string
}

export interface UserMappingWarehouse {
  id: number
  name: string
}

export interface UserMappingUser {
  id: number
  username: string
}

export type MappingMatrix = Record<string, Record<string, number>>

export interface UserMappingData {
  mapping: MappingMatrix
  products: UserMappingProduct[]
  users: UserMappingUser[]
  warehouses: UserMappingWarehouse[]
}
