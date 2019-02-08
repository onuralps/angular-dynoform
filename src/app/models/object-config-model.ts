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

export class MasterDataTable {
  name: string;
  groups: MasterDataAttributeGroup[];
  readonly: boolean;
}
