import { ComponentType } from 'react';
import { ViewProps } from '@/types/view.types';

export async function loadView(contentType: string): Promise<ComponentType<ViewProps> | null> {
  try {
    const viewName = contentType.toLowerCase();
    const view = await import(`@/views/${viewName}`);
    return view.default;
  } catch (error) {
    return null;
  }
}
