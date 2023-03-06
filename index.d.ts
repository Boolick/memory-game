declare module "*.jpg";
declare module "*.jpeg";
declare function request(arg0: {
    url: string;
    params: { deckCount: number } | {};
    onSuccess:
        | ((response: { deck_id: string }) => void | string)
        | ((response: { cards: { image: string }[] }) => string[]);
}): string[];
