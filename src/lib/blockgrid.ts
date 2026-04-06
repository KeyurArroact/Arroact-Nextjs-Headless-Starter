import { ComponentType } from 'react';
import { BlockGridUtils, type BlockGridItem } from 'arroact-umbraco-graphql-sdk';

export async function loadBlockComponent(
  contentType: string
): Promise<ComponentType<any> | null> {
  try {
    const componentName = BlockGridUtils.getComponentName(contentType);
    const component = await import(`@/components/${componentName}`);
    return component.default;
  } catch (error) {
    return null;
  }
}

export function parseBlockGridData(blockGridData: any): {
  blocks: BlockGridItem[];
  errors: string[];
} {
  if (!blockGridData) {
    return { blocks: [], errors: ['No blockGridData provided'] };
  }

  const result = BlockGridUtils.parseBlockGridData(blockGridData);

  return result;
}

export function getComponentName(contentType: string): string {
  return BlockGridUtils.getComponentName(contentType);
}

export function logBlockInfo(_block: BlockGridItem, _index: number): void {
}
