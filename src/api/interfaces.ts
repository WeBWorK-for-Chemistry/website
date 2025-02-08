export interface IApiItem {
    type: string;
    name: string;
    access: string;
    description?: string;
    overloads?: IOverload[];
}
export interface IOverload {
    parameters: IParameter[];
    returns: string;
    description?: string;
    examples?: IExample[];
}
export interface IParameter {
    name: string;
    type: string;
    description: string;
    optional?: boolean;
    keys?: IHashItem[];
}
export interface IHashItem {
    key: string;
    type: string;
    default?: string | number;
    optional?: boolean;
    description: string;
}
export interface IExample {
    example: string;
    description: string;
}