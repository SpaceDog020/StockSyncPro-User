import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth {
    @Field( type => String,{ nullable: false })
    access_token: string;

}
