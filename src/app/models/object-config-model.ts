export class MasterDataAttributeGroup {
  name: string;
  attributes: MasterDataAttribute[];
}

export class MasterDataAttribute {
  name: string;
  label: string;
  constraints: any;
  type: string;
  // FE attributes
  prop: string;
  sortable = true;
  filterable = true;
  editable: boolean;
  visible: boolean;
  shownOnMaintenance: boolean;
}

export class MasterDataEntityAttribute extends MasterDataAttribute {
  tableName: string;
  maintenanceDisplayField: string;
  tableDisplayField: string;
  serviceUrl: string;
}

export class MasterDataEnumAttribute extends MasterDataAttribute {
  enumValues: any[];
  multiple: boolean;
  className: string;
}

export class MasterDataDomain {
  name: string;
  masterDataObjectList: MasterDataTable[];
}

export class RelatedObject {
  name: string;
  relatedObjectName: string;
  mappedBy: string;
  subPath: string;
  relationType: string;
  includedOption: boolean;
  showEditWarningForAsr: boolean;
}


export class MasterDataTable {
  name: string;
  label: string;
  objectType: string;
  simple: boolean;
  commonAttributes: MasterDataAttribute[];
  groups: MasterDataAttributeGroup[];
  maintenanceScope: string;
  domain: string;
  serviceUrl: string;
  columns: MasterDataAttribute[];
  readonly: boolean;
  selectable: boolean;
  relatedObjects: RelatedObject[];
  visible: boolean;
  uiRelevant: boolean;
  importExport: boolean;
  showDeleteWarning: boolean;
  deleteWarningObjects: string;

}

export class MasterDataConfig {
  readonly commonAttributes: MasterDataAttribute[];
  readonly commonAttributesNamedMd: MasterDataAttribute[];
  readonly commonAttributesMd: MasterDataAttribute[];
  readonly masterDataDomainList: MasterDataDomain[];
  readonly enums: any;
}
