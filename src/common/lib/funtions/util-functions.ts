const isObject = ( obj ) => obj && typeof obj === 'object';

export function mergeDeep<T>( target: T, source: any ): T
{

  if( !isObject( target ) || !isObject( source ) )
  {
    return source;
  }

  Object.keys( source ).forEach( key =>
  {
    const targetValue = target[key];
    const sourceValue = source[key];

    if( Array.isArray( targetValue ) && Array.isArray( sourceValue ) )
    {
      let filtered = targetValue.filter( instance =>
        !sourceValue.some( type => instance.ngModule && type.ngModule ? instance.ngModule.name === type.ngModule.name : instance.name === type.name )
      );
      target[key] = filtered.concat( sourceValue );
    }
    else if( isObject( targetValue ) && isObject( sourceValue ) )
    {
      target[key] = mergeDeep( Object.assign( {}, targetValue ), sourceValue );
    }
    else
    {
      target[key] = sourceValue;
    }
  } );

  return target;
}