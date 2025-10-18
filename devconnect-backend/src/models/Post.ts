import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  body: string;
  author: mongoose.Types.ObjectId;
  upvotes: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
}, { timestamps: true });

export default mongoose.model<IPost>('Post', PostSchema);
