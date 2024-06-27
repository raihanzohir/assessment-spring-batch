export interface TableColumn<T> {
  label: string;
  property: string;
  type: 'text' | 'image' | 'badge' | 'progress' | 'checkbox' | 'button' | 'number' | 'date' | 'serial' | 'balance';
  visible?: boolean;
  cssClasses?: string[];
}
