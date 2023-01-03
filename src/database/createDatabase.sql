CREATE TABLE "users" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	"picture" TEXT NOT NULL,
	"username" VARCHAR(50) NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "sessions" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"userId" INTEGER NOT NULL,
	"token" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"userId" INTEGER NOT NULL,
	"postId" INTEGER NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "urls" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"url" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "hashtags" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"hashtag" TEXT NOT NULL UNIQUE,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "posts" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"userid" INTEGER NOT NULL,
	"urlId" INTEGER NOT NULL,
	"post" TEXT NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

CREATE TABLE "postsHashtags" (
	"id" SERIAL NOT NULL PRIMARY KEY ,
	"postId" INTEGER NOT NULL,
	"hashtagId" INTEGER NOT NULL,
	"createdAt" TIMESTAMP WITHOUT TIME ZONE NOT NULL DEFAULT NOW()
);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("postId") REFERENCES "posts"("id");

ALTER TABLE "posts" ADD CONSTRAINT "posts_fk0" FOREIGN KEY ("userid") REFERENCES "users"("id");
ALTER TABLE "posts" ADD CONSTRAINT "posts_fk1" FOREIGN KEY ("linkId") REFERENCES "urls"("id");

ALTER TABLE "postsHashtags" ADD CONSTRAINT "postsHashtags_fk0" FOREIGN KEY ("postId") REFERENCES "posts"("id");
ALTER TABLE "postsHashtags" ADD CONSTRAINT "postsHashtags_fk1" FOREIGN KEY ("hashtagId") REFERENCES "hashtags"("id");