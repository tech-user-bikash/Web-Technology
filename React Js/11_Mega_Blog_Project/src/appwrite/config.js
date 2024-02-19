import envConfig from "../env_config/envConfig.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;
  constructor() {
    this.client
      .setEndpoint(envConfig.appwriteUrl)
      .setProject(envConfig.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // create post
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        // document_id = any unique id would be fine.
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Service :: createPost :: error ", error);
    }
  }

  // update post
  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        // document_id = any unique id would be fine.
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Service :: updatePost :: error ", error);
    }
  }

  // delet post
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Service :: deletePost :: error ", error);
      return false;
    }
  }

  // get post for unique id
  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("Appwrite Service :: Service :: getPost :: error ", error);
    }
  }

  // get all posts
  async getAllPost(quries = [Query.equal("status", "Active")]) {
    try {
      return await this.databases.getDocument(
        envConfig.appwriteDatabaseId,
        envConfig.appwriteCollectionId,
        quries
      );
    } catch (error) {
      console.log("Appwrite Service :: Service :: getAllPost :: error ", error);
    }
  }

  // file upload
  async uploadFile(file) {
    try {
      await this.storage.createFile(
        envConfig.appwriteBucketId,
        ID.unique(),
        file
      );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Service :: uploadFile :: error ", error);
      return false;
    }
  }

  // delete file
  async deleteFile(fileId) {
    try {
        await this.storage.deleteFile(
          envConfig.appwriteBucketId, fileId
        );
      return true;
    } catch (error) {
      console.log("Appwrite Service :: Service :: deleteFile :: error ", error);
      return false;
    }
  }

  // get preview of image
  getPreview(fileId) {
    return this.storage.getFilePreview(
        envConfig.appwriteBucketId, fileId
    );
  }
}

const service = new Service();
export default Service;
