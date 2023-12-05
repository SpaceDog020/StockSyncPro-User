import { Field, ObjectType } from "@nestjs/graphql"

@ObjectType()
export class CreateAuthDto {
    @Field( type => String,{ nullable: false })
    password: string
    @Field( type => String,{ nullable: false })
    email: string
}

