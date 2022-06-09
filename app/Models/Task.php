<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
    use HasFactory;

    protected $table="tasks";

    protected $fillable = [
        'text',
        'limit_date',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo('App\Models\User');
    }

    public function taskable()
    {
        return $this->belongsToMany(
            $this->morphTo(),
            'taskables',
            'model_id',
            'task_id',
            'id',
            'id'
        );
    }
}
