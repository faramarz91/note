<?php

namespace App\Http\Resources;

use Illuminate\Hashing\Argon2IdHasher;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class NoteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>  $this->id,
            'title' => $this->title,
            'body' => $this->body,
            'created_at' => $this->created_at->diffForHumans(),
            'updated_at' => $this->updated_at->diffForHumans(),
            'creation_date' => $this->created_at->format('D j/m/Y'),
            'creation_time' => $this->created_at->format('h:i A'),
            'update_date' => $this->updated_at->format('D j/m/Y'),
            'update_time' => $this->updated_at->format('h:i A'),

        ];
    }
}
