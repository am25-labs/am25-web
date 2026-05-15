export interface RichTextTextNode {
  type: "text";
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface RichTextLinkNode {
  type: "link";
  url: string;
  children: RichTextTextNode[];
}

export type RichTextInlineNode = RichTextTextNode | RichTextLinkNode;

export interface RichTextParagraphBlock {
  type: "paragraph";
  children: RichTextInlineNode[];
}

export interface RichTextImageData {
  url: string;
  alternativeText?: string;
  caption?: string;
}

export interface RichTextImageBlock {
  type: "image";
  image: RichTextImageData;
}

export interface RichTextHeadingBlock {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: RichTextInlineNode[];
}

export interface RichTextQuoteBlock {
  type: "quote";
  children: RichTextInlineNode[];
}

export interface RichTextListItemBlock {
  type: "list-item";
  children: RichTextInlineNode[];
}

export interface RichTextListBlock {
  type: "list";
  format: "ordered" | "unordered";
  children: RichTextListItemBlock[];
}

export type RichTextBlock =
  | RichTextParagraphBlock
  | RichTextImageBlock
  | RichTextHeadingBlock
  | RichTextQuoteBlock
  | RichTextListBlock;
