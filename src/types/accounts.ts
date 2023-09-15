export interface Account {
  icon: string;
  id: string;
  initialValue: number;
  isActive: boolean;
  name: string;
}

export interface AccountWithRest extends Account {
  rest: number;
}
