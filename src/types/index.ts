export interface Project {
  id: number;
  title: string;
  icon: string;
  tags: string[];
  demo: string;
  code: string;
  desc: string;
  features: string[];
  showDemo: boolean;
}

export interface SidebarState {
  isOpen: boolean;
  projectIndex: number | null;
  sourceRect: DOMRect | null;
}
