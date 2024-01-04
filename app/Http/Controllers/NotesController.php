<?php

namespace App\Http\Controllers;

use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class NotesController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $user = auth()->user();
        return NoteResource::collection($user->notes()->latest('updated_at')->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): NoteResource
    {
        $validated = $request->validate([
            'title' => ['required','max:255'],
            'body' => []
        ]);
        $note = new Note;

        $note->title = $validated['title'];
        $note->body = $validated['body'];
        $note->user_id = auth()->id();
        $note->save();

        return new NoteResource($note);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Note $note, Request $request)
    {
        $validated = $this->validate($request, [
            'title' => 'required|string|max:255',
            'body' => ''
        ]);
        $note->update(attributes: $validated);

        return Response()->json(['data' => new NoteResource($note)])->status(204);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Note $note)
    {
        if ($note->trashed()){
            return $note->trashed();
        } else {
            return $note->delete();
        }
    }
}
