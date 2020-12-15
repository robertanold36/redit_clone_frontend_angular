export class CreatePostPayload {
    createdDate!:number
    postName!: string;
    subredditName?: string;
    url?: string;
    description!: string;
}