<?php

namespace App;

enum DependantRelationship: string
{
    case GUARDIAN = 'guardian';
    case RELATIVE = 'relative';
    case OTHER = 'other';
}
